const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const slug = require("slugify");
//////////////////////////////////////
// const { text } = require('stream/consumers');

//Bocking code execution synchronus way
// const textIn=fs.readFileSync('./txt/input.txt','utf-8');// this will read the text from the input.txt file and assign the text to the variable
// console.log(textIn);

// const textOut=`This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;

//Blocking code execution
// fs.writeFileSync('./txt/output.txt',textOut); //this will write the text on the file output.txt and create the file output.txt
// console.log("file written!");

//Non Blocking Asynchronous Way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written");
//       });
//     });
//   });
// });
// console.log("Will Read File");

//////////////////////////////////
///SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const DataObj = JSON.parse(data);
const slugs = DataObj.map((el) => slug(el.productName, { lower: true }));
// console.log(slug('Fresh Avocados',{lower:true}));
console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req.headers.host);
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  //   console.log(myUrl);

  //   const{query,pathname}=url.parse(req.url,true);
  //   console.log(url.parse(req.url,true));
  const pathname = myUrl.pathname;
  //   console.log(pathname);

  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = DataObj.map((el) => replaceTemplate(tempCard, el)).join(
      "",
    );
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    // console.log(cardsHtml);
    // res.end(tempOverview);
    res.end(output);
  }

  //Product page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const id = myUrl.searchParams.get("id");
    const product = DataObj[id];
    // console.log(product);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  //API page
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
    //     const productData=JSON.parse(data);
    //     // console.log(productData);

    // });
    // res.end("API");
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>this page can't be found</h1>");
  }
  // res.end('Hello from the Server');
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
