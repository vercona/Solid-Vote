

function subStrEdit(
  str:string, 
  ...args:[number, number|((string)=>string), (string)=>string]
) {
  const cb = args.splice(-1)[0]
  if (typeof cb === 'number') throw new Error('Last arg must be valid callback');

  let [start, len] = args
  len = typeof len === 'number' ? len : undefined

  return (
    str.substring(0, start) +
    cb( str.substring(start, len) ) +
    typeof len === 'number' ? str.substring(len) : ''
  )
}

function toCap(str:string) {
  return str[0].toUpperCase + str.substring(1).toLowerCase()
}

function toTitle(str:string) {
  let exceptions = ['a', 'an', 'the', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'and', 'as', 'but', 'or', 'nor']
  let pattern = new RegExp(`?!(${exceptions.join('|')})\b\w+`)
  return toCap(str).replaceAll(pattern, matched => toCap(matched))
}

/* function toTitle(str:string) {
  let exceptions = ['a', 'an', 'the', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'and', 'as', 'but', 'or', 'nor']
  return str.replaceAll(/\w+/, (matched, index) => {
    if (index === 0)  return toCap(matched)
    if ( exceptions.includes(matched) ) return matched
    return toCap(matched)
  })
} */