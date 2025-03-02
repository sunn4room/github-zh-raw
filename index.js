// ==UserScript==
// @name         github-zh raw
// @version      1.0
// @description  customize github-zh pages
// @author       sunn4room
// @match        https://www.github-zh.com/search/result?*
// @match        https://www.github-zh.com/projects/*
// @icon         https://www.github-zh.com/favicon.ico
// @grant        none
// @require      https://scriptcat.org/lib/513/2.1.0/ElementGetter.js#sha256=aQF7JFfhQ7Hi+weLrBlOsY24Z2ORjaxgZNoni7pAz5U=
// @downloadURL  https://github.com/sunn4room/github-zh-raw/raw/refs/tags/1.0/index.js
// @updateURL    https://github.com/sunn4room/github-zh-raw/raw/refs/heads/main/index.js
// ==/UserScript==

(function () {
  "use strict";
  /* global elmGetter */
  elmGetter.each(
    "#repo-wrapper > div.container-lg > div.Box > div.Box-header > span.font-semibold",
    document,
    (file) => {
      const nav_items = document.querySelectorAll(".UnderlineNav-item");
      const github_url = nav_items[nav_items.length - 1].getAttribute("href");
      const branch = document
        .querySelectorAll(".octicon-repo-forked")[1]
        .parentNode.textContent.trim();
      const raw_link = document.createElement("a");
      raw_link.setAttribute("class", "ml-2 text-small color-fg-subtle");
      raw_link.setAttribute("target", "_blank");
      raw_link.textContent = "raw";
      file.parentNode.appendChild(raw_link);
      const raw_link2 = document.createElement("a");
      raw_link2.setAttribute("class", "ml-2 text-small color-fg-subtle");
      raw_link2.setAttribute("target", "_blank");
      raw_link2.textContent = "master-raw";
      file.parentNode.appendChild(raw_link2);
      const update_raw_link = function () {
        raw_link.setAttribute(
          "href",
          "https://gh-proxy.com/" +
            github_url +
            "/raw/refs/heads/" +
            branch +
            "/" +
            file.textContent,
        );
        file.parentNode.removeChild(raw_link);
        file.parentNode.appendChild(raw_link);
        raw_link2.setAttribute(
          "href",
          "https://gh-proxy.com/" +
            github_url +
            "/raw/refs/heads/master/" +
            file.textContent,
        );
        file.parentNode.removeChild(raw_link2);
        file.parentNode.appendChild(raw_link2);
      };
      update_raw_link();
      const observer = new MutationObserver(update_raw_link);
      observer.observe(file, { subtree: true, characterData: true });
    },
  );
  elmGetter.each(".cm-editor", document, (editor) => {
    editor.setAttribute("style", "max-height: none");
  });
})();
