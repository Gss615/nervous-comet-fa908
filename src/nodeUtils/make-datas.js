
var fs = require('fs')
const { flatten } = require('lodash')
const util = require('util');
const readdir = util.promisify(fs.readdir);


let allFiles = {}

async function readF(path) {
    let names;
    try {
        names = await readdir('../../static/images/huawei/network');
    } catch (e) {
        console.log('e', e);
    }
    if (names === undefined) {
        console.log('undefined');
    } else {
        console.log('First Name', names[0]);
    }
    return names
}



readF('../../static/images/huawei/network').then(async list => {
    let allPromise = list.map(async (file) => {
        if (`.DS_Store` !== file) {
            return await readdir(`../../static/images/huawei/network/${file}`).then(tf => {
                tf.map(f => {
                    if (!allFiles[file]) {
                        allFiles[file] = {}
                    }

                    allFiles[file][f.split('.')[0]] = true
                })
            })

        }
    })
    Promise.all(allPromise).then(() => {
        console.log(list)
        let i = list.length
        list.map((file) => {
            if (`.DS_Store` !== file) {
                let name = file
                let path = `${allFiles[file]}/01.png`
                if (true === allFiles[file]['top']) {
                    path = `${file}/top.png`
                }
                if (true === allFiles[file]['front_top']) {
                    path = `${file}/front_top.png`
                }
                if (true === allFiles[file]['01']) {
                    path = `${file}/01.png`
                }
                const content = `---
id: '1'
price: '49.40'
title: ${name}
description: >-
  
default_thumbnail_image: images/huawei/network/${path}
default_original_image: images/huawei/network/${path}
featured: true
order: 5
category: src/pages/category/network-switches.md
seo:
  title: Nulla suscipit
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Nulla suscipit
      keyName: property
    - name: 'og:description'
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      keyName: property
    - name: 'og:image'
      value: images/huawei/network/${path}
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Nulla suscipit
    - name: 'twitter:description'
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    - name: 'twitter:image'
      value: images/huawei/huaweiAP/${path}
      relativeUrl: true
template: product
---`
                fs.writeFile(`${name}.md`, content, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //文件写入成功。
                })

            }
        })

    })
})
