import "./index.css";
import BackgroundColor from "./BackgroundColors";
import Borders from "./Borders";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import ForegroundColors from "./ForegroundColors";
import Margins from "./Margins";
import Padding from "./Padding";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import ReactIconsSampler from "./ReactIcons";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapList from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
    return (
        //<div id = "wd-lab2">
            <div className="container">
            <h2>Lab 2 - Cascading Style Sheet</h2>
            <h3>Styling with the STYLE attribute</h3>
            
            {/* <p style = {{background:"blue", color:"white"}}>*/}
            <p>
                Style attribute allows configuring look and feel
                right on the element. Although it's very convenient
                it is considered bad practice and you should avoid
                using the style attribute
            </p> 
        <div id = "wd-css-id-selectors">
            <h3>ID Selectors</h3>
            <p id = "wd-id-selector-1">
                Instead of changing the look and feel of all the
                elements of the same name, e.g., P, we can refer
                to a specific element by its ID
            </p>
            <p id ="wd-id-selector-2">
                Here's another paragraph using a different ID and
                a different look and
                feel
            </p>
        </div>

        <div id="wd-css-class-selectors">
            <p className="wd-class-selector">
                Instead of using IDs to refer to elements, you
                can use an element's CLASS attribute
            </p>
            <h4 className="wd-class-selector">
                This heading has same style as paragraph above
            </h4>
        </div>
   
        <div className="wd-selector-1">
            <h3>Document structure selectors</h3>
            <div className="wd-selector-2">
                Selectors can be combined to refer elements in particular
                places in the document
                <p className="wd-selector-3">
                    This paragraph's red background is referenced as
                    <br />
                    .selector-2 .selector3<br />
                    meaning the descendant of some ancestor.<br />
                    <span className="wd-selector-4">
                        Whereas this span is a direct child of its parent
                    </span><br />
                        You can combine these relationships to create specific
                        styles depending on the document structure
                </p> 
            </div>
        </div>

        <ForegroundColors />
        <BackgroundColor />
        <Borders />
        <Padding />
        <Margins />
        <Corners />
        <Dimensions />
        <Positions />
        <Zindex />
        <Float />
        <GridLayout />
        <Flex />
        <ReactIconsSampler />
        <BootstrapGrids />
        <BootstrapTables />
        <BootstrapList />
        <BootstrapForms />
        <BootstrapNavigation />
        <ScreenSizeLabel />

        {/*
            <p>
                Lorem ipsum dolor.
            </p>
            <h2>Colors</h2>
            <h3 className="wd-fg-color-blue">
                Foreground color</h3>
            <p className="wd-fg-color-red">
                The text in this paragraph is red but
                <span className="wd-fg-color-green"> this text is green
                </span>
           </p>
           <h3 className="wd-bg-color-blue wd-fg-color-white">
            Background color</h3>
            <p className="wd-bg-color-red wd-g-color-black">
            This background of this paragraph is red but
            <span className="wd-bg-color-green wd-fg-color-white"> the background of this text is green and the
            foreground white</span></p>
            <h1>Block vs inline elements</h1>
            <p>Headings and paragraphs are
            block elements. Width is parent's
            width</p>
            Normal text renders inline
            <br/><br/>
            <span>Span elements</span>
            <span>render inline</span> with the rest of the content
            <h1 style={{
            backgroundColor: "yellow"}}>
            Block vs inline elements
            </h1>
            <p style={{
            backgroundColor: "blue",
            color:"white",
            marginTop:"50px"}}>
            Headings ... width</p>
            Normal text renders inline
            <br/><br/>
            <span style={{
            backgroundColor: "red", color:"white",
            borderStyle: "solid",
            borderTopWidth: "10px",
            borderBottomWidth: "20px",
            borderLeftWidth: "5px",
            borderRightWidth: "15px",
            borderLeftColor: "green",
            borderRightColor:"blue",
            borderBottomColor:"white"
            }}>Span elements</span>
            <span style={{
            backgroundColor: "red", color:"white"}}>render inline</span>
            with the rest of the content */}
        </div>
    );
}