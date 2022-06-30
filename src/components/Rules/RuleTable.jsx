import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeActivityRequest,
  changeOrderRequest,
  deleteRuleRequest,
} from "../../routes/rules/actions";
import { range, orderBy } from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../utils/helpers";
import { rulesProperties } from "../../utils/constants";
import ConfirmDialog from "../../utils/confirmDialog";
import Notification from "../../utils/alert";

export default function RuleTable({ rule, method, merchant }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tempRule, setRule] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(
      deleteRuleRequest({
        id: id,
        merchant: merchant,
        method: method,
      })
    );
  };

  useEffect(() => {
    setRule(rule);
  }, [rule]);

  const onDrop = (reOrderedRule) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const newArr = reOrderedRule.map(
      ({
        name,
        description,
        merchant,
        paymentMethod,
        ruleConditions,
        resultOptions,
        active,
        deleted,
        ...rest
      }) => {
        return rest;
      }
    );
    dispatch(changeOrderRequest({ rules: newArr }));
  };

  const handleActive = ({ id, active, merchant, method }) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to change the activity?",
      onConfirm: () => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        dispatch(
          changeActivityRequest({
            id: id,
            activity: !active,
            merchant: merchant,
            method: method,
          })
        );
      },
      onFail: () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const directionOfDrag =
      destination.index > source.index ? "GREATER" : "LESS";
    let affectedRange = [];
    if (directionOfDrag === "GREATER") {
      affectedRange = range(source.index, destination.index + 1);
    } else if (directionOfDrag === "LESS") {
      affectedRange = range(destination.index, source.index);
    }
    const randomRule = JSON.parse(JSON.stringify(tempRule));
    const reOrderedRule = randomRule.map((item, index) => {
      if (item.id === result.draggableId) {
        item.priority = result.destination.index;
        return item;
      } else if (affectedRange.includes(item.priority)) {
        if (directionOfDrag === "GREATER") {
          item.priority = item.priority - 1;
          return item;
        } else if (directionOfDrag === "LESS") {
          item.priority = item.priority + 1;
          return item;
        }
      }
      return item;
    });
    setRule(reOrderedRule);
    setConfirmDialog({
      isOpen: true,
      title:
        "Are you sure to update the priority from " +
        source.index +
        " to " +
        destination.index +
        "?",
      onConfirm: () => {
        onDrop(reOrderedRule);
      },
      onFail: () => {
        setRule(tempRule);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const listRenderer = orderBy(tempRule, "priority").map((item) => (
    <Draggable
      draggableId={item.id.toString()}
      index={+item.priority}
      key={item.id}
    >
      {(provided) => (
        <StyledTableRow
          key={item.id}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <StyledTableCell {...provided.dragHandleProps} align="left">
            <ReorderIcon />
          </StyledTableCell>
          {rulesProperties.map(function (key, index) {
            return (
              <StyledTableCell
                align="left"
                key={index}
                {...provided.dragHandleProps}
              >
                {item[key]}
              </StyledTableCell>
            );
          })}
          <StyledTableCell align="left" {...provided.dragHandleProps}>
            <Switch
              {...label}
              checked={item.active}
              color="success"
              onChange={() =>
                handleActive({
                  id: item.id,
                  active: item.active,
                  merchant: merchant,
                  method: method,
                })
              }
            />
          </StyledTableCell>
          <StyledTableCell {...provided.dragHandleProps}>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete this rule?",
                  onConfirm: () => {
                    onDelete(item.id);
                  },
                  onFail: () =>
                    setConfirmDialog({ ...confirmDialog, isOpen: false }),
                });
              }}
              color="error"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell {...provided.dragHandleProps}>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() =>
                navigate("/ruleForm", {
                  state: {
                    rule: item,
                    method: method,
                    merchant: merchant,
                  },
                })
              }
              color="primary"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      )}
    </Draggable>
  ));

  if (tempRule)
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"Rule"}>
            {(provided) => (
              <TableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Table aria-label="customized table">
                  <TableHead sx={{ backgroundColor: "#384d6c" }}>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>

                      <StyledTableCell align="left">PRIORITY</StyledTableCell>

                      <StyledTableCell align="left">NAME</StyledTableCell>
                      <StyledTableCell align="left">
                        DESCRIPTION
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        PAYMENT METHOD
                      </StyledTableCell>
                      <StyledTableCell align="left">MERCHANT</StyledTableCell>
                      <StyledTableCell align="left">ACTIVE</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{listRenderer}</TableBody>
                </Table>
                {provided.placeholder}
              </TableContainer>
            )}
          </Droppable>
        </DragDropContext>
        <Notification />
        <ConfirmDialog confirmDialog={confirmDialog} />
      </>
    );
  return null;
}
