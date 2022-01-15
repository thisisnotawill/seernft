import React, { useEffect, useState } from "react";
import ViewSelection from "./ViewSelection";
import FilterSelection from "./FilterSelection";
import { useSelector, useDispatch } from "react-redux";
import { setContractAddress } from "../actions";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import { loadAssets, setAssetStatus, setFilteredAssets } from "../actions";
import "../fonts/pointpanther.otf";
const Header = () => {
  const dispatch = useDispatch();
  const axios = require("axios").default;
  const [contract, setContract] = useState("doodles");
  //modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loadCollection = (contract) => {
    // These assets to be consumed different later on
    const options = {
      method: "GET",
      // url: `https://api.opensea.io/api/v1/assets?asset_contract_address=${contract}&order_direction=desc&offset=0&limit=50`,
      url: `http://localhost:4200/api/assets/doodles-official`,
      // headers: {
      //   Accept: "application/json",
      //   "X-API-KEY": "a1e7e59f08ab40c2a987005a5e4557bc",
      // },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        loadAssets(dispatch, response.data);
        // On initial submission of a new contract, filtered assets is equal to assets
        setFilteredAssets(dispatch, response.data);
        setAssetStatus(dispatch, "Loaded");
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <header>
      <span id="Logo">SPYGLASS</span>
      <div className="searchbar">
        <InputGroup className="mb-3 search">
          <FormControl
            placeholder="Contract Address"
            aria-label="Contract Address"
            aria-describedby="basic-addon2"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            className="searchbar"
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => {
              setAssetStatus(dispatch, "Loading...");
              setContractAddress(dispatch, contract);
              loadCollection(contract);
            }}
          >
            Search
          </Button>
        </InputGroup>
      </div>
      <ViewSelection />
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <FilterSelection />
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;
