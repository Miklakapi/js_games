"use strict";

$(document).ready(function () {
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
            $('.area').append('<div class="square"></div>');
        }
    }
});