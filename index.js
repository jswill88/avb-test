// class Tag
//    newTag(name, whatGoesInTag(optional))  => returns the tag
//    AddAttribute(attributeName, attributeContent) => doesn;t return anything
//    SetValue(contentOfATag)
//    print();  => print the content of the tag with indentation, shoudl look just like a html file 

class Tag {
  constructor(root) {
    this.root = root;
    this.children = [];
    this.attributes = [];
  }
  newTag(tagName, tagContent) {
    const newTag = new Tag(tagName);
    if (tagContent) newTag.children.push(tagContent);
    this.children.push(newTag);
    return newTag;
  }
  AddAttribute(attributeName, attributeContent) {
    this.attributes.push({
      name: attributeName,
      content: attributeContent,
    });
  }
  SetValue(tagContent) {
    this.children.push(tagContent);
  }
  print(indent = 0) {

    let spaces = '';
    for(let i = 0; i < indent; i++) {
      spaces += ' ';
    }

    let stringToPrint = `${spaces}<${this.root}`;
    for (let attribute of this.attributes) {
      stringToPrint += ` ${attribute.name}="${attribute.content}"`;
    }
    stringToPrint += '>';

    let tagChildren = false;

    for (let child of this.children) {
      if (typeof child === 'string') stringToPrint += child;
      else {
        stringToPrint += '\n';
        stringToPrint += child.print(indent + 2);
        tagChildren = true;
      }
    }

    stringToPrint += `${tagChildren ? '\n' + spaces : ''}</${this.root}>`;

    if(!indent) console.log(stringToPrint);

    return stringToPrint;
  }
}

let root = new Tag("html");
let head = root.newTag("head");
let title = head.newTag("title", "Cool Title!");

let body = root.newTag("body");
let main = body.newTag("div");
main.AddAttribute("id", "main")
main.AddAttribute("class", "main")
let heading = main.newTag("h1", "Nice Heading")
let p1 = main.newTag("p")
p1.SetValue("A paragraph of text ...")
let p2 = main.newTag("p")
p2.SetValue("Another paragraph of text ...")
let a1 = p2.newTag("a", "link to somewhere");
a1.AddAttribute("href", "https://link.to.somewhere")
let a2 = p2.newTag('a', 'second link');
a2.AddAttribute('href', 'http://second.link');

root.print();