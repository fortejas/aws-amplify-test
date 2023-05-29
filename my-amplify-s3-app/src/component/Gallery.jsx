import { Image } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import { useEffect, useState } from "react"

const ImageItem = ({ imageDetails, level }) => {
  const [state, setState] = useState({ url: '', loaded: false })

  useEffect(() => {
      Amplify.Storage.get(imageDetails.key, { level: level })
      .then(result => setState({ url: result, loaded: true }))
      .catch(err => console.log('Error fetching file'))
  }, [])

  if (!state.loaded) return <>Loading...</>

  return <Image src={state.url} />
}

export function Gallery({ level }) {

  let [imageList, setImageList] = useState([])

  useEffect(() => {
    Amplify.Storage.list('', { level: level, pageSize: 20 })
      .then(({ results }) => results.filter(item => item.size > 0))
      .then((imageList) => setImageList(imageList))
      .catch(err => { if (err) { console.log('Error')} })
  }, [])

  return <>
    {
      imageList.map(
        (item, idx) =>
          <ImageItem imageDetails={item} level={level} key={idx} />
      )
    }
  </>
}
