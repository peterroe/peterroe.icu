function commentRule(a, b, c) {
  console.log('[ arr ] >', a.src.match(/\{(.+)\}\((.*)\)/))
}

export default function comment(md, name, options) {
  md.renderer.rules.text
  // console.log('[ {a}, {b}, {c} ] >', { a }, { b }, { c })
  // })
  console.log(md.renderer.rules)
}
