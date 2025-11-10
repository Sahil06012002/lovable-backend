import fs from "fs"
import path from "path"


 function readFile(rootPath) {
  let codebase = []
  console.log("data")
// get the root folder here and recurse all the files inside

    function walk(rootPath) {
      const entries = fs.readdirSync(rootPath,{ withFileTypes: true })
      for(const entry of  entries)
      {
        const fullPath = path.join(rootPath,entry.name)
        if(! entry.isDirectory()){


        fs.readFile(fullPath,"utf-8",(err,data)=> {
        if(err){
        console.log("err")

      }
      if(data){
        console.log("data")
        console.log(data)
        const fileData = {
          fileName : entry,
          content : data
        }
        codebase.push(fileData)
      }
    })
    return 
        }else{
            walk(fullPath)
        }

      }    
}

walk(rootPath)

}

console.log("Current working dir:", process.cwd());

readFile('../../seed')