/**
 * <div id = "parent">
 *      <div id = "child">
 *       <h1></h1>
 *      </div>
*       <div id = "child2">
 *       <h1></h1>
 *      </div>
 * </div>
 * 
 * ReactElement(Object) => HTML(Browser understands)
 */

const parent = React.createElement(
    "div", { id: "parent" },
    [React.createElement("div", { id: "child" },
        [React.createElement("h1", {}, "Hello Bhaiya"),
        React.createElement("h5", {}, "Bye Bhaiya")]),    
        React.createElement("div", { id: "child" },
        [React.createElement("h1", {}, "Hello Bhaiya"),
        React.createElement("h5", {}, "Bye Bhaiya")])]
)

// const heading = React.createElement(
//     "h1",
//     { id: "heading" },
//     "Hello Brotha!");

console.log(parent); //object

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent)

// 0:47:49