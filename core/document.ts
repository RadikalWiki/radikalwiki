const format = (leaf: any) => {
  const bold = leaf.bold ? `<strong>${leaf.text}</strong>` : leaf.text;
  const code = leaf.code ? `<em>${bold}</em>` : bold;
  const underline = leaf.underline ? `<u>${code}</u>` : code;
  const italic = leaf.italic ? `<i>${underline}</i>` : underline;
  const link = leaf.link ? `<a href=${leaf.link}>${italic}</a>` : italic;

  return link;
};

export function toHtml(doc: any) {
  return doc?.map((element: any) => {
    const formatted = element.children.map(format).join("");
    switch (element.type) {
      case "block-quote":
        return `<blockquote>${formatted}</blockquote>`;
      case "bulleted-list":
        return `<ul>${formatted}</ul>`;
      case "heading-one":
        return `<h1>${formatted}</h1>`;
      case "heading-two":
        return `<h2>${formatted}</h2>`;
      case "heading-three":
        return `<h3>${formatted}</h3>`;
      case "heading-four":
        return `<h4>${formatted}</h4>`;
      case "heading-five":
        return `<h5>${formatted}</h5>`;
      case "heading-six":
        return `<h6>${formatted}</h6>`;
      case "list-item":
        return `<li>${formatted}</li>`;
      case "numbered-list":
        return `<ol>${formatted}</ol>`;
      default:
        return `<p>${formatted}</p>`;
    }
  }).join("");
}