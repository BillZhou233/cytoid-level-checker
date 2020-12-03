// 大括号不换行的跟换行的打，变量名首字母大写的跟不大写的打，私有域前面加下划线的跟不加下划线的打

window.editorReady = false;
window.inpReady = false;

(async () => {
    let fetchResult = await fetch("https://raw.githubusercontent.com/CytoidCommunity/Schemas/master/2.0/level.json");
    if (fetchResult.ok)
    {
        let schema = await fetchResult.json();
        let el = document.getElementById("editor-placeholder");
        window.jsoneditor = new JSONEditor(el, {
            schema: schema,
            array_controls_top: true,
            no_additional_properties: true,
            show_opt_in: true,
            remove_button_labels: true,
            use_default_values: false,
            disable_collapse: true,
            disable_properties: true,
            disable_edit_json: true,
            theme: "bootstrap4",
            iconlib: "fontawesome4"
        });
        jsoneditor.on("change", () => {
            let validationErrors = jsoneditor.validate();
            if (validationErrors.length === 0) window.editorReady = true;
        });
        console.log("loaded schema");
    }
    else console.log("load failed with status code" + fetchResult.status);
})();

function readData()
{
    let inp = {};
    try
    {
        inp = JSON.parse(document.getElementById("inp").value);
    }
    catch (error) 
    {
        alert("JSON 语法都弄错力！踢！");
        return;
    }
    jsoneditor.setValue(inp);
    inpReady = true;
    document.getElementById("inptitle").innerText = "展开输入框";
}

function writeData()
{
    if (editorReady) 
    {
        let out = jsoneditor.getValue();
        document.getElementById("inp").value = JSON.stringify(out, null, 4);
    }
    inpReady = true;
    document.getElementById("inptitle").innerText = "展开输入框";
}

function initInp()
{
    inpReady = false;
    document.getElementById("inptitle").innerText = "* 展开输入框";
}

function idCheck()
{
    if (inpReady && document.getElementById("inp").value.length)
    {
        let inp = {};
        try
        {
            inp = JSON.parse(document.getElementById("inp").value);
        }
        catch (error) 
        {
            return;
        }
        open("https://cytoid.cn/levels/" + inp.id, "_blank");
    }
}

function compress()
{
    try
    {
        document.getElementById("inp").value = JSON.stringify(JSON.parse(document.getElementById("inp").value));
    }
    catch (error) 
    {
        alert("JSON 语法都弄错力！踢！");
    }
}