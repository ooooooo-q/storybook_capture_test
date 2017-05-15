const glob = require('glob');
const fs = require('fs');


glob('./src/stories/**.js', (err, files)=>{
  // console.log(files)

  const stories = [];

  files.forEach((filename) => {
    const file = fs.readFileSync(filename, 'utf-8');
    // console.log(file)

    const lines = file.split('\n');
    const story = {};
    let storyName = '';

    lines.forEach((line) => {
      if(line.match(/storiesOf\(/)){
        const sotryName = line.match(/\'(.*)\'|\"(.*)\"|`(.*)`/);
        storyName = sotryName[0].slice(1, -1);
        story[storyName] = [];
      } else if(line.match(/add\(/)){
        const addName = line.match(/\'(.*)\'|\"(.*)\"|`(.*)`/);
        story[storyName].push(addName[0].slice(1, -1));
      } 
    })

    // console.log(story);
    stories.push(story);
  })


  const path = "./storybook-static/index.html"
  const setting = "&full=1&down=1&left=1&panelRight=0&downPanel=kadirahq/storybook-addon-actions/actions-panel"

  const urls = [];

  stories.forEach((story) => {
    Object.keys(story).forEach((storyName) => {
      story[storyName].forEach((name) => {
        const url = `${path}?selectedKind=${encodeURIComponent(storyName)}&selectedStory=${encodeURIComponent(name)}${setting}`;
        urls.push(`== ${url} ${url}`)
      })
    })

  })

  // console.log(urls);

  fs.writeFileSync('reftest-urls.list', urls.join("\n"));
})



