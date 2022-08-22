/**
 * @version SID-V2
 * @brief Switch HTML Element ID and retrieve it for usage at the same time
 * @param {String} od Old ID (Current ID)
 * @param {String} nd New ID (Intended ID)
 * @returns HTML Element
 *
 */
 function sID(od, nd) {
    od = document.getElementById(od);
    od.id = nd;
    return document.getElementById(nd);
  }