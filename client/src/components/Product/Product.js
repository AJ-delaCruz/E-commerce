import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {backendUrl} from "../../config";

const Product = ({item}) => {
    const [fav, setFav] = useState({});
    const userId = localStorage.getItem("user_id");

    // const handleClick = () => {
    //     // const dat = {username: "jay"};
    //     axios.post(`${backendUrl}/favorites/${item._id}`, userId)
    //         .then((res) => {
    //             console.log(res.data)
    //         }).catch((error) => {
    //         console.log(error)
    //     });
    //
    //     console.log("ADD FAVORITES");
    //
    //
    // };

    return (
        <div>
            <ProductContainer key={item.id}>
                <Link to={`/product/${item._id}`}/>
                <ProductImage src={`${backendUrl}/${item.image}`}/>
                <ProductInfo>
                    <HeartIcon>
                        <Checkbox
                            icon={<FavoriteBorder/>}
                            checkedIcon={<Favorite style={{color: "red"}}/>}
                        />
                    </HeartIcon>
                </ProductInfo>
            </ProductContainer>
            {/*// </Link>*/}
        </div>
    );
};

export default Product;

const HeartIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const ProductInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: flex-end;
  transition: all 0.5s ease;
  cursor: pointer;
  opacity: 0;
`;

const ProductContainer = styled.div`

  flex: 1;
  margin: 5px;
  min-width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${ProductInfo} {
    opacity: 1;
  }

`;


const ProductImage = styled.img`
  height: 50%;
  z-index: 2;

`;
