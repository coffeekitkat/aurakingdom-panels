const fs = require('fs');

let filelist = []

const files = fs.readdirSync("./static/images/")

filelist = files.map(e => {
    return {
        filename: e.replace('.PNG', ''),
        path: `images/${e}`
    }
})

fs.writeFileSync("./static/panellist.json",JSON.stringify(filelist))