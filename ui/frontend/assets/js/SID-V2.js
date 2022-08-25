/**
 * @version SID-V2
 * @brief document.getElementbyId() with supercow powers. Switch HTML Element ID and retrieve it for usage at the same time
 * @author Immanuel Garcia
 * @param {String} od Old ID (Current ID)
 * @param {String} nd New ID (Intended ID)
 * @returns {Element} [HTMLDOMElementObject]
 * @example
 * // Switching an element of ID "x" to ID "y" while simultaneously changing the background style to a color of red
 * sID("x", "y").style.background = "red";
 *
 */
 function sID(od, nd) {
    od = document.getElementById(od);
    od.id = nd;
    return document.getElementById(nd);
  }
