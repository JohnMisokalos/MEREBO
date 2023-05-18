import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

export default function FullWidthTextField({ SearchBarProp, onKeyDownEnter }) {
  const handleKeyboardClick = function (event) {
    if (event.keyCode === 13) {
      //13 -> Enter
      onKeyDownEnter(true);
    }
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <InputLabel htmlFor="outlined-adornment-amount">
        <TextField
          fullWidth
          label="Search utilizing the power of Solr"
          id="searchBar"
          onKeyDown={handleKeyboardClick}
          onChange={(e) => {
            SearchBarProp(e.target.value);
            // console.log("SearchInput: " + e.target.value);
          }}
        />
      </InputLabel>
    </Box>
  );
}
