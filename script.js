(function () {
    var currentPlayer = "player1";
    var modal = $("#modal");
    var isGameOver = false;
    console.log("let's start");
    console.log(modal.find("span"));

    $("#currentPlayer").text(
        currentPlayer === "player1"
            ? "It's YELLOW player turn"
            : "It's  RED player turn"
    );

    $(".column").on("mousedown", function (e) {
        if (isGameOver) {
            return;
        }

        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
    });

    $(".column").on("mouseup", function (e) {
        if (isGameOver) {
            return;
        }

        var board = $("#board").children().children();

        if (
            checkForVictoryDiagonal(board) ||
            checkForVictoryColumn(board) ||
            checkForVictoryRow(board)
        ) {
            console.log("victory!!!!");
            isGameOver = true;

            // show modal
            setTimeout(function () {
                modal.css({ visibility: "visible" });
            }, 900);

            modal
                .find("span")
                .text(
                    currentPlayer === "player1"
                        ? "YELLOW player won!"
                        : "RED player won!"
                );
            console.log("after victory ");
        }
        switchPlayer();
    });

    $("#closeModal").on("click", function () {
        modal.css({ visibility: "hidden" });
        console.log("end game ");
    });

    $("#resetButton").on("click", function () {
        //reset board
        isGameOver = false;
        var board = $("#board").children().children();
        for (var i = 0; i < board.length; i++) {
            board.eq(i).removeClass("player1");
            board.eq(i).removeClass("player2");
        }
        modal.css({ visibility: "hidden" });
        console.log("reset game ");
    });

    function checkForVictoryColumn(board) {
        var counter = 0;
        var columnCounter = -1;
        for (var i = 0; i < board.length; i++) {
            columnCounter++;

            if (board.eq(i).hasClass(currentPlayer)) {
                counter++;

                if (counter === 4) {
                    return true;
                }
            } else {
                counter = 0;
            }

            if (columnCounter === 5) {
                counter = 0;
                columnCounter = -1;
            }
        }
    }

    function checkForVictoryRow(board) {
        var counter = 0;
        for (var j = 0; j < 6; j++) {
            counter = 0;
            for (var i = j; i < board.length; i += 6) {
                if (board.eq(i).hasClass(currentPlayer)) {
                    counter++;

                    if (counter === 4) {
                        return true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
    }

    function checkForVictoryDiagonal(board) {
        if (
            checkForVictoryDiagonal7(board) ||
            checkForVictoryDiagonal5(board)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function checkForVictoryDiagonal7(board) {
        var diagonal7 = [0, 1, 2, 6, 12, 18];
        var counter = 0;

        for (var j = 0; j < diagonal7.length; j++) {
            counter = 0;
            arrValue = diagonal7[j];
            for (var i = arrValue; i < board.length; i += 7) {
                if (board.eq(i).hasClass(currentPlayer)) {
                    counter++;

                    if (counter === 4) {
                        return true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
    }

    function checkForVictoryDiagonal5(board) {
        var diagonal5 = [3, 4, 5, 11, 17, 23];
        var counter = 0;

        for (var j = 0; j < diagonal5.length; j++) {
            counter = 0;
            arrValue = diagonal5[j];
            for (var i = arrValue; i < board.length; i += 5) {
                if (board.eq(i).hasClass(currentPlayer)) {
                    counter++;

                    if (counter === 4) {
                        return true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
    }
    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }

        $("#currentPlayer").text(
            currentPlayer === "player1"
                ? "It's YELLOW player turn"
                : "It's  RED player turn"
        );
    }
})();
