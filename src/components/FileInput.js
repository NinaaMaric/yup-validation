import React from "react";
import Paper from "@material-ui/core/Paper";
import CloudUpload from "@material-ui/icons/CloudUpload";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

import { Controller } from "react-hook-form";
import Dropzone from "react-dropzone";

export const FileInput = ({ control, name }) => {

    return (
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ onChange, onBlur, value }) => (
          <>
            <Dropzone onDrop={onChange}>
              {({ getRootProps, getInputProps }) => (
                <Paper
                  variant="outlined"
                  
                  {...getRootProps()}
                >
                  <CloudUpload />
                  <input {...getInputProps()} name={name} onBlur={onBlur} />
                  <p>Drag 'n' drop files here, or click to select files</p>
                </Paper>
              )}
            </Dropzone>
            <List>
              {value.map((f, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      />
    );
  };
