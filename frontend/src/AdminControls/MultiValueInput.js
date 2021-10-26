import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Tags({ setTags, tag }) {
  useEffect(() => {
    let arr = [];
    tag.map((element) => {
      arr.push(element.tag);
    });
    setTags(arr);
  }, []);
  const setTagsHandler = (values) => {
    let arr = [];
    values.map((element) => {
      arr.push(element.tag);
    });
    console.log(arr);
    setTags(arr);
  };
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={tags}
        getOptionLabel={(option) => option.tag}
        filterSelectedOptions
        defaultValue={[...tag]}
        onChange={(event, values) => {
          setTagsHandler(values);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Tags" />
        )}
      />
    </Stack>
  );
}

const tags = [
  { tag: "implementation" },
  { tag: "math" },
  { tag: "greedy" },
  { tag: "dp" },
  { tag: "data structures" },
  { tag: "brute force" },
  { tag: "constructive algorithms" },
  { tag: "graphs" },
  { tag: "sortings" },
  { tag: "binary search" },
  { tag: "dfs and similar" },
  { tag: "trees" },
  { tag: "strings" },
  { tag: "number theory" },
  { tag: "combinatorics" },
  { tag: "geometry" },
  { tag: "bitmasks" },
  { tag: "two pointers" },
  { tag: "dsu" },
  { tag: "shortest paths" },
  { tag: "probabilities" },
  { tag: "divide and conquer" },
  { tag: "hashing" },
  { tag: "games" },
  { tag: "flows" },
  { tag: "interactive" },
  { tag: "matrices" },
  { tag: "string suffix structures" },
  { tag: "fft" },
  { tag: "graph matchings" },
  { tag: "ternary search" },
  { tag: "expression parsing" },
  { tag: "meet-in-the-middle" },
  { tag: "2-sat" },
  { tag: "chinese remainder theorem" },
  { tag: "schedules" },
];
