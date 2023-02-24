import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import {getFrom} from "../../helpers";
import TrollFace from "../../assets/defaultIcon.jpg";

import AddIcon from "@mui/icons-material/Add";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

function HeadingText() {
    return (
        <Typography variant="h2" sx={{m: 1}} align="center">
            Comments
        </Typography>
    );
}

export default function ViewCommentsModal(props) {
    const [comments, setComments] = useState(null);

    useEffect(() => {
        (async () => {
            let commentData = await getFrom(`/comments/post/${props.postID}`);
            setComments(commentData);
        })();
    }, []);

    return (
        <React.Fragment>
            <HeadingText />
            <List>
                {comments
                    ? comments.map(comment => (
                          <React.Fragment>
                              <ListItem
                                  alignItems="flex-start"
                                  key={comment.id}
                              >
                                  <ListItemAvatar>
                                      <Avatar alt="TrollFace" src={TrollFace} />
                                  </ListItemAvatar>
                                  <ListItemText
                                      primary={comment.postedBy}
                                      secondary={comment.text}
                                  />
                              </ListItem>
                              <Divider />
                          </React.Fragment>
                      ))
                    : null}
            </List>
        </React.Fragment>
    );
}
