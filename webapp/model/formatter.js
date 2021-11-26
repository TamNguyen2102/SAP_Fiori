sap.ui.define([], function () {
  "use strict";

  return {
    statusText: function (sStatus) {
      var oResourceBunlde = this.getView().getModel("i18n").getResourceBundle();
      switch (sStatus) {
        case "A":
          return oResourceBunlde.getText("invoiceStatusA");
        case "B":
          return oResourceBunlde.getText("invoiceStatusB");
        case "C":
          return oResourceBunlde.getText("invoiceStatusC");
      }
    },
  };
});
