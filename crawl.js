const { resolvePlugin } = require('@babel/core')
const { JSDOM } = require('jsdom')

const crawlPage = async (currentURL) => {
    console.log(`Actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }

        console.log(await resp.text())
    } catch (err) {
        console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`)
    }
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const URLs = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                URLs.push(urlObj.href)
            } catch (err) {
                console.log(`Error with relative URL: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href)
                URLs.push(urlObj.href)
            } catch (err) {
                console.log(`Error with absolute URL: ${err.message}`)
            }
        }
    } 
    return URLs
}

const normalizeURL = (urlString) => {
    const urlObj = new URL(urlString)
    hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}