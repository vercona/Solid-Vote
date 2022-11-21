import './style.scss'

import Page from "~/components/Page";

import useStore from './store'
import formParser from '~/use/formParser'

import valueArr from '~/static/keyArr.json'
import showArr from '~/static/showArr.json' 

export default function builder () {
  let arr = useStore()

  return (
    <Page
      title="Vote Builder"
    > 
      {formParser(arr)} 
      <br/>{JSON.stringify(valueArr)}
      <br/>{JSON.stringify(showArr)}
    </Page>
  )
}