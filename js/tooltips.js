const template =
`function add (parameterOne, parameterTwo) {
  console.log('Adding', parameterOne, 'and', parameterTwo)
  return parameterOne + parameterTwo
}

let sum = add(3, 4)`

const example = {
  template,
  tooltips: {
    string: {
      text: `This is a string. Strings can be bounded or delimted by \`backticks\`, 'single qoutes', or "double quotes"`,
    },

    function: {
      text: "The fundamental unit of code in javascript. Functions are possibly the most important feature of the language.",
      terms: ["Hoisting", "Scope", "Closure", "Delimiters", "Arguments", "Parameters", "Signature"]
    },

    params: {
      text: "This is the function's signature: what parameters it takes."
    },

    title: {
      text: "This is the name of the function. The function when declared in this way, will be hoisted to the top of its scope."
    },

    built_in: {
      text: "`console` is a host object, a built-in object in JavaScript. The `window` is another example."
    },

    return: {
      text: "The return (or output) of the function."
    },

    let: {
      text: "We're declaring a variable named sum here. Variables declared with let exist only within and not outside whatever their current scope is."
    },

    number: {
      text: "This is a number in JavaScript. <br><br> It's being passed as one of two arguments to the function `add` invoked here. <br><br>Functions are invoked with `()`. When we pass arguments to a function we are invoking or calling, we place them the in the parentheses, as is done above with 3 and 4."
    }
  }
}

$(document).ready( _=> {
  $('pre code').text(example.template)
  hljs.initHighlighting()

  $('span[class^="hljs-"]').mouseover(highlightActive)
  $('span[class^="hljs-"]').mouseout(highlightActive)
  $('span[class^="hljs-"]').mouseover(showToolTip)
  $('span[class^="hljs-"]').mouseout(hideToolTip)

  function highlightActive () {
    $(this).toggleClass('active')
  }

  function hideToolTip () {
    $('#tooltip').toggleClass('hidden')
    return false
  }

  function showToolTip (event) {
    event.stopImmediatePropagation()
    const $this = $(this)
    const classes = $this.attr('class')
    const nodeText = $this.text()
    const highlightClass = classes.replace('hljs-', '').replace(' active', '')
    const tipKey = highlightClass === 'keyword'
      ? nodeText
      : highlightClass
    const $tooltip = $('#tooltip')
    if (tipKey !== 'keyword') {
      const toolTipText = example.tooltips[tipKey].text
      $tooltip.toggleClass('hidden').html(toolTipText)
      const posObj = $this.position()
      $tooltip.css('top', posObj.top + $this.height())
      $tooltip.css('left', posObj.left)
    }
  }
})