let fileName = $('#originalContent').data('file-filename');
let originalUrl = `pck-transcripts/originals/${fileName}`;
let revisedUrl = `pck-transcripts/revised/${fileName}`;

function add_diff() {
    var original = difflib.stringAsLines(document.originalTranscript);
    var revised = difflib.stringAsLines(document.revisedTranscript);
    // create a SequenceMatcher instance that diffs the two sets of lines
    var sm = new difflib.SequenceMatcher(original, revised);

    // get the opcodes from the SequenceMatcher instance
    // opcodes is a list of 3-tuples describing what changes should be made to the base text
    // in order to yield the new text
    var opcodes = sm.get_opcodes();
    var diffoutputdiv = $("#diffContent");
    while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
    var contextSize = $("contextSize").value;
    contextSize = contextSize ? contextSize : null;

    // build the diff view and add it to the current DOM
    document.getElementById("diffContent").appendChild(diffview.buildView({
        baseTextLines: original,
        newTextLines: revised,
        opcodes: opcodes,
        // set the display titles for each resource
        baseTextName: "Original Transkript",
        newTextName: "Überarbeitetes Transkript",
        contextSize: contextSize,
        viewType: 0
    }));
}

var jqxhr_o = $.ajax(originalUrl)
.done(function(data) {
    $("#originalContent code").text(data);

    document.querySelectorAll('#originalContent code').forEach((el) => {
        hljs.highlightElement(el);
    });
    document.originalTranscript = data;
})
.fail(function(xhr, status, error) {
    console.log(xhr);
    console.log(status);
    console.log(error);
})
.always(function() {
});

var jqxhr_r = $.ajax(revisedUrl)
.done(function(data) {
    $("#revisedContent code").text(data);

    document.querySelectorAll('#revisedContent code').forEach((el) => {
        hljs.highlightElement(el);
    });

    document.revisedTranscript = data;

    add_diff();
})
.fail(function(xhr, status, error) {
    console.log(xhr);
    console.log(status);
    console.log(error);
})
.always(function() {
});
