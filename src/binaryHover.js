const BINARY_CHAR_CLASS = "binary-hover-char";
const BINARY_WORD_CLASS = "binary-hover-word";
const BASE_SKIP_SELECTOR = [
  ".ascii-logo",
  ".px",
  "script",
  "style",
  "textarea",
  "input",
  `.${BINARY_CHAR_CLASS}`,
  `.${BINARY_WORD_CLASS}`,
].join(", ");

const splitTextNodeToChars = (node) => {
  const text = node.textContent || "";
  if (!text.trim()) return;

  const fragment = document.createDocumentFragment();

  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;

    if (/^\s+$/.test(part)) {
      fragment.appendChild(document.createTextNode(part));
      return;
    }

    const wordSpan = document.createElement("span");
    wordSpan.className = BINARY_WORD_CLASS;

    Array.from(part).forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.className = BINARY_CHAR_CLASS;
      charSpan.dataset.char = char;
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    fragment.appendChild(wordSpan);
  });

  node.replaceWith(fragment);
};

export const splitTextForBinaryHover = (root, targetSelector, extraSkipSelector = "") => {
  if (!root) return;

  const skipSelector = extraSkipSelector
    ? `${BASE_SKIP_SELECTOR}, ${extraSkipSelector}`
    : BASE_SKIP_SELECTOR;

  root.querySelectorAll(targetSelector).forEach((target) => {
    if (target.dataset.binarySplit === "true") return;

    target.dataset.binaryOriginalHtml = target.innerHTML;

    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.textContent || !node.textContent.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        const parentElement = node.parentElement;
        if (!parentElement) {
          return NodeFilter.FILTER_REJECT;
        }

        if (parentElement.closest(skipSelector)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(splitTextNodeToChars);
    target.dataset.binarySplit = "true";
  });
};

export const restoreBinaryHover = (root) => {
  if (!root) return;

  root.querySelectorAll("[data-binary-split='true']").forEach((target) => {
    target.innerHTML = target.dataset.binaryOriginalHtml || "";
    delete target.dataset.binarySplit;
    delete target.dataset.binaryOriginalHtml;
  });
};

export const getBinaryCharsWithinRadius = (root, clientX, clientY, radiusPx) => {
  const radiusSquared = radiusPx * radiusPx;
  const chars = Array.from(root.querySelectorAll(`.${BINARY_CHAR_CLASS}`));

  return chars.filter((charNode) => {
    const rect = charNode.getBoundingClientRect();
    const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
    const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);

    return dx * dx + dy * dy <= radiusSquared;
  });
};
