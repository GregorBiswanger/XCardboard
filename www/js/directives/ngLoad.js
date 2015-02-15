var ngLoad = function () {
    return {
        link: function (scope, element, attrs) {
            element.bind("load", function (e) {
                scope.$apply(attrs.ngLoad);
            });

        }
    };
};
