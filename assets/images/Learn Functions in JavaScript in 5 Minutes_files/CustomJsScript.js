/**
 * CustomJsScript.js
 * Script to Get the Javascript source code from textbox, compile it and display output
 * @author Guru99
 
 * Will get code from each <pre class=codeguru> tag and load it inside the Editor
 * On Clicking Run button it will compile the code in the browser
 * Will Display the output
 * @version 1.1 - 24-Feb-14 -Initial Version
 * @version 2.1 - 20-May-14 - Ramji Goyal - Code commented and Made same as PHP Editor
 - Used jQuery instead of jQuery for removing any jQuery Conflicts
 */

/*******************************************Define Code mirror for each pre tag having class=codeguru**************************************************/
jQuery(document).ready(function()
{
    // for each pre tag
    jQuery('pre.codeguru').each(function()
    {
        var pre = this;
        var form = jQuery('form[name=sample]').clone();            //make clone of form
        jQuery(form).removeAttr('name');                          //remove name and hidden style
        jQuery(form).removeClass('hidden');
        jQuery(jQuery(form).find('textarea')[0]).val(jQuery(pre).text());   //copy pre tag value to form textarea
        jQuery(pre).replaceWith(form);  //replace pre tag with form

    });
    var editors = []; //array of editor



    // for each textarea tag

    jQuery('textarea[name=codeguru]').each(function()
    {
        //set code mirror property look and feel
        var editor = CodeMirror.fromTextArea(this,
                {
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: "xml",
                    htmlMode: true,
                    tabMode: "shift"

                });
        editors.push(editor); //push this editor in to editors aray
    });
    /*******************************************************************************************************************************************************/



    /*******************************************Compile code and Display Output when Run button clicked************************************************/
    // on submit this function will call
    jQuery('form[id=frm_compile]').submit(function()
    {
        var form = this;
        var myCodeMirror = jQuery(this).find('div textarea[name=codeguru]');    // get first textarea of form
        var code = jQuery(myCodeMirror).val();   // get value of textarea 


        var code_normalized = code.toLowerCase();   //convert code to lower case

        // check if code contain <script> tag or not 
        if (code_normalized.indexOf('<script') == -1)
        {
            alert("Error: <script> tag not used");
            return false;
        }
        // check if code contain </script> tag or not 
        if (code_normalized.indexOf('</script') == -1)
        {
            alert("Error: </script> tag not used");
            return false; //To stop page from reloading
        }

        //delete normalized code
        delete code_normalized;

        //create_iframe_results();

        var randomnumber = Math.floor(Math.random() * 1111) //create random number
        var i = document.createElement('IFRAME');

        i.id = randomnumber;   //define id of iframe
        i.frameBorder = '0';       //define border of iframe
        i.style.height = '100%';   //set height of iframe
        i.style.width = '100%'; //set width of iframe
        jQuery(this).append(i);

        var doc = document.getElementById(randomnumber).contentDocument; // get the iframe which we created above
        //alert(doc);

        doc.open();   //open iframe
        doc.write(code); //write the code into iframe
        doc.close();  //close the iframe
        autoResize(randomnumber); //call the autoResize function to resize the output iframe
        return false;


    }); //submit function complete

    /** autoResize will get the height and width of frame 
     autoResize will set new height and width with that in above step
     This will remove the scroll bars from the result **/

    function autoResize(id) {
        var newheight;
        var newwidth;
        if (document.getElementById) {
            newheight = document.getElementById(id).contentWindow.document.body.scrollHeight;
            newwidth = document.getElementById(id).contentWindow.document.body.scrollWidth;
        }
        document.getElementById(id).height = (newheight) + "px";
        document.getElementById(id).width = (newwidth) + "px";
    }


})(jQuery);
/*******************************************************************************************************************************************************/