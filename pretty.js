var url = document.location.href;

safari.self.addEventListener("message", function(e) {
    if (e.name === "setup") {
        settings = e.message.settings;

        function format(node) {
            node.innerText = pretty(node.innerText, settings);
        }

        if (/\.json$/.test(url) || (document.getElementsByTagName("pre") &&
        							document.getElementsByTagName("pre")[0] &&
            						document.getElementsByTagName("pre")[0].innerText &&
           							/^\[|{$/.test(document.getElementsByTagName("pre")[0].innerText[0]))) {
            format(document.getElementsByTagName("pre")[0]);
        }
    }
}, false);

safari.self.tab.dispatchMessage("getSettings");

function pretty(json, settings){
	var use_tabs = settings['use_tabs'];
	var space_indent = settings['space_indent'];

	space_indent = isNaN(space_indent) ? 4 : space_indent;

    return JSON.stringify(JSON.parse(json), null, use_tabs ? "\t" : Number(space_indent));
}