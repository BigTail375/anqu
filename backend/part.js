const fetch = require("node-fetch");



const images = async () => {
    const response = await fetch('https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=lily&onChainCollectionAddress=&direction=2&field=1&limit=500&offset=0&mode=all', {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
    },
    })

    const data = await response

    console.log(data)
}


images()