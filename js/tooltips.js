const template =
`function add (parameterOne, parameterTwo) {
  console.log('Adding', parameterOne, 'and', parameterTwo)
  return parameterOne + parameterTwo
}

var sum = add(3, 4)`

const example = {
  template,
  tooltips: {
    string: {
      text: `This is a string, or a series of characters. A string is bounded or delimted by \`backticks\`, 'single qoutes', or "double quotes".` ,
    },

    function: {
      text: "A function contains code that runs when the function invoked (called). <br><br> Functions have inputs, called either arguments or parameters. <br><br> When invoking a function, like below with `add(3, 4)`, we pass it 2 arguments, the numbers 3 and 4. <br><br> Parameters are what inputs a function takes, and are defined by the function declaration, like on the line above.",
      terms: ["Hoisting", "Scope", "Closure", "Delimiters", "Arguments", "Parameters", "Signature"]
    },

    params: {
      text: "These are the function's inputs, or what parameters it takes. Inputs or parameters are part of a function's signature."
    },

    title: {
      text: "This is the name of the function. The function when declared in this way, will be hoisted to the top of its scope."
    },

    built_in: {
      text: "`console` is a host object, a built-in object in JavaScript. The `window` is another example."
    },

    return: {
      text: "The return (or output) of the function. This will be the value of `sum` when the function `add` is invoked. This is the other part of a function's signature."
    },

    var: {
      text: "A variable named `sum` is declared here."
    },

    number: {
      text: "This is a number in JavaScript. <br><br> It's being passed as one of two arguments to the function `add` invoked (or called) here. <br><br>Functions are invoked with `()`. When arguments are passed to an invoked function, they are placed within the parentheses, as is done above with 3 and 4."
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
    const $tooltip = $('#tooltip')

    $tooltip.toggleClass('hidden')
    const classes = $this.attr('class')
    const highlightClass = classes.replace(/(hljs-)|( active)/g, '')
    const nodeText = $this.text()
    const tipKey = highlightClass === 'keyword'
      ? nodeText
      : highlightClass
    if (tipKey !== 'keyword') {
      const toolTipText = example.tooltips[tipKey].text
      $tooltip.html(toolTipText)
      const posObj = $this.position()
      $tooltip.css('top', posObj.top + $this.height())
      $tooltip.css('left', posObj.left)
    }
  }
})
