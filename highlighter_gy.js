$(document).ready(function() {
  function assignIDs() {
    $('#doc_contents *').each(function( index ) {
      this.setAttribute('id', ('e' + index));
    })
  }
  assignIDs();
  rangy.init();

  highlighter = rangy.createHighlighter();
  applier = rangy.createClassApplier("highlight");
  highlighter.addClassApplier(rangy.createClassApplier("highlight", {
    ignoreWhiteSpace: true,
    tagNames: ["span", "a"]
  }));



  // Testing creating a new highlight
  // function Highlight(doc, characterRange, classApplier, converter, id, containerElementId)

  $('#deleteHighlights').on('click', function(e) {
    e.preventDefault();
    highlighter.removeAllHighlights();
  });

  $('#buildHighlights').on('click', function(e) {
    e.preventDefault();
    buildHighlights();
  });


  $('article').on('mouseup', function(e) {
   e.stopPropagation();
   e.preventDefault();





   if (window.getSelection) {
     var sel = window.getSelection();
     var range = sel.getRangeAt(0);
     if (sel.rangeCount && (range.toString().length > 0) && (range.toString() != " ") ) {
       // var rangeClone = range.cloneContents();
       // positionMenu($('#highlightCreatePopover'), range.getBoundingClientRect()["top"]);
       $('#highlightCreatePopover').show().addClass('slideUp');
       // Add an onclick event handler to the add highlight button
       $('#addHighlight').on('click', function(e) {

        e.preventDefault();
        highlightSelectedText()
        $('#highlightCreatePopover').hide();
         // printAllHighlights();
         // hideHighlighterMenus();
       });
     }
   }
 });

  function highlightSelectedText() {
    highlighter.highlightSelection("highlight");
  }

  function removeHighlightFromSelectedText() {
    highlighter.unhighlightSelection();
  }

  function highlightScopedSelectedText() {
    highlighter.highlightSelection("highlight", { containerElementId: "summary" });
  }

  function noteScopedSelectedText() {
    highlighter.highlightSelection("note", { containerElementId: "summary" });
  }

  function reloadPage(button) {
    button.form.elements["serializedHighlights"].value = highlighter.serialize();
    button.form.submit();
  }



});


