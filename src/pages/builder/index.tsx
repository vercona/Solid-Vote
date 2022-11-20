import './style.scss'

import Page from "~/components/Page";

import useStore from './store'
import formParser from '~/use/formParser'

//@ts-ignore 
import valueArr from '~/static/keyArr.json'
import showArr from '~/static/showArr.json' 

/* interface Form {
  label: 'Submission Settings',
  type: 'category',
  content: [],
} */




export default function builder () {
  let arr = useStore()
  /* let arr = [
    {
      label: 'Submission Settings', type: 'category',
      content: [
        {
          label: 'Submission Limit', type: 'text',
        },
        {
          label: 'Submission Vitality', type: 'radio',
          options: [
            'Expiration',
            'lock on win'
          ]
        }
      ]
    },

    {
      label: 'HMM', type: 'category',
      content: [
        {
          label: 'Deeper!', type: 'category',
          h: '4',
          content: [
            {
              label: 'another input', type: 'text',
            }
          ]
        },
      ]
    }
  ]
 */
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