import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { TbPhone } from "react-icons/tb";
import {Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import "./Team.css";
import venkatesh from "../images/venkatesh.jpeg"
import rushikesh from "../images/rushikesh.png"
import pushpak from "../images/pushpak.jpg"
import aniket from "../images/aniket.jpeg"
import sabiha from "../images/sabiha.jpg"

const TeamComponent = () => {

  const image = {
    height : '20rem',
  }
  
  const cardStyle = {
    backgroundColor:'white',
    color: 'black', 
    padding: '20px',
    border: '1px solid grey',

  };

  const icon = {
    color:"black",height:"2rem", width:"3rem", float:'right'
  }

  const phone= {
    height:"3rem",
    width:"2rem"
  }

  const teamMembers = [
    {
      id: 1,
      name: 'Venkatesh Pujari',
      role: 'Software Engineer',
      linkedn: 'https://www.linkedin.com/in/venkatesh-pujari-632101248/',
      gmail:'venkateshpujari333@gmail.com',
      insta:'#',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur commodo consequat.',
      photo: venkatesh,
      phn : 9008439330
    },
    {
      id: 2,
      name: 'Rushikesh Nimje',
      role: 'Software Engineer',
      linkedn: 'https://www.linkedin.com/in/rushikesh-nimje-6418731b3',
      gmail:'rushikeshnimje444@gmail.com',
      insta:'https://www.instagram.com/rushikesh_nimje/',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur commodo consequat.',
      photo: rushikesh, 
      phn : 9518394332

    },
    {
      id: 3,
      name: 'Aniket Pardeshi',
      role: 'Software Engineer',
      linkedn: "https://www.linkedin.com/in/aniket-pardeshi-69933b21b",
      gmail:'aniketpardeshi2001@gmail.com',
      insta:'#',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur commodo consequat.',
      photo: aniket, 
      phn : 9834985338

    },
    {
      id: 4,
      name: 'Pushpak Gulkari',
      role: 'Software Engineer',
      linkedn: "https://www.linkedin.com/in/pushpak-gulkari-b11141201",
      gmail:'gulkaripushpak@gmail.com',
      insta:'#',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur commodo consequat.',
      photo: pushpak,
      phn : 9011123007

    },
    {
      id: 5,
      name: 'Sabiha Naikawadi',
      role: 'Software Engineer',
      linkedn: 'https://www.linkedin.com/in/sabiha-naikawadi-5b5872248/',
      gmail:'sabiha.naikawadi3@gmail.com',
      insta:'#',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      photo:sabiha,
      phn : 7775846686

    },
  ];

  return (
    <Container style={{background:"none"}} className="my-5 px-3">
      <div className='heading'>
      <h2 className="text-center mb-4" style={{fontWeight:"700"}}>Meet Our Team</h2>
      </div>
     <div>
         <Row >
        {teamMembers.map((member) => (
          <Col key={member.id} md={12} sm={6} xs={12} className="mb-4">
            <Card style={cardStyle}>
              
              <Card.Body className='d-flex py-3 cardBody'>
                <div className='image_border'>
              <Card.Img style={image} variant="top" src={member.photo} alt={member.name} />
              </div>
              <div className='mt-4 pl-4'>
                <Card.Title style={{fontSize:"2.5rem"}}>{member.name}</Card.Title>
                <Card.Subtitle style={{fontWeight:"800"}} className="mb-2 text-muted">{member.role}</Card.Subtitle>
                <Card.Text>{member.description}</Card.Text>
                <Card.Text> <TbPhone style={phone} /> {member.phn}</Card.Text>
                <a href={member.linkedn} target='_blank'>
                    <FaLinkedin  style={icon} /></a>
                {/* </Link> */}
                <Link to={member.insta} target='_blank'>
                  <FaInstagram style={icon} />
                </Link>
                <Link to={`mailto:${member.gmail}`}>
                    <BiLogoGmail  style={icon} />
                </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
     </div>
     
    </Container>
  );
};

export default TeamComponent;
