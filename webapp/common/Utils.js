sap.ui.define(["sap/base/Log"], function (Log) {
  "use strict";
  return {
    _oLogger: Log.getLogger("sap.ui.demo.walkthrough.common.Utils"),

    getFragment: function (sFragmentId, sFragmentName, oController, bStatic) {
      var oView = oController.getView();

      if (!Object.prototype.hasOwnProperty.call(oController, "fragments")) {
        oController.fragments = {};
      }

      var oFragment = oController.fragments[sFragmentName];
      if (oFragment === undefined) {
        var sId = "";
        if (sFragmentId) {
          sId = oView.createId(sFragmentId);
        } else {
          sId = oView.getId();
        }
        var sNameSpace = "";
        if (bStatic) {
          sNameSpace = "sap.ui.demo.walkthrough.fragment.";
        } else {
          sNameSpace = oController.getMetadata().getNamespace();
          var iReplaceIndex = sNameSpace.indexOf(".controller");
          sNameSpace = sNameSpace.replace(
            sNameSpace.slice(iReplaceIndex),
            ".fragment."
          );
        }

        oFragment = sap.ui.xmlfragment(
          sId,
          sNameSpace + sFragmentName,
          oController
        );
        oController.fragments[sFragmentName] = oFragment;
        oView.addDependent(oFragment);
      }
      return oFragment;
    },
  };
});
