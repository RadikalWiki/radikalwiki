export function toHtml(doc: any) {
  return doc?.map((e: any) => {
    switch (e.type) {
      case "paragraph":
        return `<p>${e.children.map((child: any) => child.text).join("")}</p>`;
    }
  }).join("");
}
