import { StorageManager } from "@aws-amplify/ui-react-storage"
import { useState } from "react"

import "@aws-amplify/ui-react/styles.css"

export function Upload() {

  let [accessLevel, setAccessLevel] = useState('protected')

  return <>
    <div>
      Upload to:&nbsp;
       <select onChange={(el) => setAccessLevel(el.target.value)}>
        Upload to:
        <option value="protected" defaultChecked={true}>Private</option>
        <option value="public">Public</option>
      </select>
    </div>
    <br/>
    <StorageManager
      acceptedFileTypes={["image/*"]}
      accessLevel={accessLevel}
      maxFileCount={1}
      maxFileSize={4 * 1000 * 1024}
    />
  </>

}
