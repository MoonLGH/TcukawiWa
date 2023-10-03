(async function() {
    const data = await fetch("https://apicomtest.kcic.co.id/public/routes?filter[route]=halim-bandung&filter[date][$gte]=2023-10-07T17:00:00.000Z&filter[date][$lte]=2023-10-08T16:59:59.059Z")
    // const data = await fetch("https://apicomtest.kcic.co.id/public/routes?filter[route]=halim-bandung&filter[date][$gte]=2023-10-06T17:00:00.000Z&filter[date][$lte]=2023-10-07T16:59:59.059Z")
    // atas 0
    // bawah 4
    const isi = await data.json()
    console.log(isi.data.length)
})();