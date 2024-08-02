const printReport = (pages) => {
    console.log("==========")
    console.log("REPORT")
    console.log("==========")
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        const url = page[0]
        const hits = page[1]
        console.log(`Found ${hits} links to page: ${url}`)
    }
    console.log("==========")
    console.log("END REPORT")
    console.log("==========")
}

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
    if (pageB[1] === pageA[1]) {
      return pageA[0].localeCompare(pageB[0])
    }
    return pageB[1] - pageA[1]
  })
  return pagesArr
}

module.exports = {
    sortPages,
    printReport
}