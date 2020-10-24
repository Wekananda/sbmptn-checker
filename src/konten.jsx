import React, { useState } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import Form from "react-bootstrap/Form";
import CardColumns from "react-bootstrap/CardColumns";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import * as firebase from "firebase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./logo.svg";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { useFirebase } from "./FirebaseProvider";
import { useList, useCollection } from "react-firebase-hooks/firestore";
import Spinner from "react-bootstrap/Spinner";
import Countdown from "./Countdown";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
function Konten() {
  const [t, setT] = useState(0);
  let pesan = [];
  const [messageLoaded, setMessageLoaded] = useState(false);
  const [messages, setMessage] = useState(
    [
      new Message({
        message: "Semangat Komang",
      }),
      new Message({
        message: "Semangat Komang",
      }), // Gray bubble
    ]
    //...
  );

  // var seconds = Math.floor((t / 1000) % 60);
  //   var minutes = Math.floor((t / 1000 / 60) % 60);
  //   var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  //   var days = Math.floor(t / (1000 * 60 * 60 * 24));

  const [value, loading, error] = useCollection(
    firebase.firestore().collection("peserta"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [value2, loading2, error2] = useCollection(
    firebase.firestore().collection("pesan"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (!loading2) {
    console.log("tes ", value2);
    value2.docs.forEach((doc) => {
      pesan.push(
        new Message({
          message: doc.data().msg,
          senderName: doc.data().sender,
        })
      );
    });
    console.log("pesan ", pesan);
    if (!messageLoaded) {
      setMessage(pesan);
      setMessageLoaded(true);
    }
  }

  const [graphData, setGraphData] = useState({
    loading: true,
    data: [],
    isDataLoaded: false,
    error: false,
    errorMsg: "",
  });
  const { firestore, user, analytics } = useFirebase();
  const graphRef = firestore.collection(`graph`).get();
  let xTickValues;
  let dataSungai;

  // if (!graphData.isdataLoaded) {
  //   firestore.collection("graph").onSnapshot(function (querySnapshot) {
  //     let graphDatas = [];
  //     querySnapshot.forEach(function (doc) {
  //       if (doc.data().createdAt !== undefined) {
  //         graphDatas.push({
  //           x: doc.data().createdAt.seconds * 1000,
  //           y: doc.data().value,
  //           tipe: doc.data().tipe,
  //         });
  //       }
  //       if (doc.data().createdAt !== undefined) {
  //         // console.log("times ", doc.data().createdAt.seconds * 1000);
  //       }
  //     });

  //     setGraphData({
  //       Loading: false,
  //       data: graphDatas,
  //       isDataLoaded: true,
  //       error: false,
  //       errorMsg: "",
  //     });
  //   });

  // graphRef.then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     // if (doc.exists) {
  //     //   setGraphData({
  //     //     dataAda: true,
  //     //     loading: false,
  //     //     data: doc.data(),
  //     //     isdataLoaded: true,
  //     //     error: false,
  //     //     errorMsg: "",
  //     //   });
  //     //   console.log("data ", doc.data());
  //     // }
  //   });
  // });

  // snapshots2.map((v) => console.log("realtime db 2", v.val(), v.key));

  //console.log("tick ", graphData.data);
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Container>
          <Navbar.Brand href="#home">SBMPTN Result Checker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Oleh Weka</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Carousel
          plugins={["infinite", "fastSwipe", "arrows", "autoplay"]}
          animationSpeed={1000}
        >
          <img
            className="img-example w-50 rounded"
            src="https://olle-tryout.s3.ap-southeast-1.amazonaws.com/file_banner/VIPOlle-2png.png"
          />

          <img
            className="img-example w-50 rounded"
            src="https://olle-tryout.s3.ap-southeast-1.amazonaws.com/file_banner/BannerOlle-PromoGopaypng.png"
          />
        </Carousel>
        <Countdown date={`2020-08-14 16:00:00`.split(/[- :]/)} />

        <CardColumns>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value &&
            value.docs.map((doc) => (
              <Card key={doc.id}>
                <Card.Body>
                  <Card.Title>{doc.data().nama}</Card.Title>
                  <Card.Text>
                    {doc.data().isGetted ? (
                      doc.data().lulus ? (
                        <Alert variant="success">
                          <Image
                            src={"https://sbmptn.ipb.ac.id" + doc.data().gambar}
                            rounded
                          />
                          <Alert.Heading>Selamat jadi maba!</Alert.Heading>
                          <p>
                            Kamu berhasil diterima di{" "}
                            <strong>{doc.data().ptnLulus}</strong>, jurusan{" "}
                            <strong>{doc.data().jurusanLulus}</strong>
                          </p>
                          <hr />
                          <p className="mb-0">
                            Tetap rendah hati dan stay calm!
                          </p>
                        </Alert>
                      ) : (
                        <Alert variant="danger">
                          <Alert.Heading>Tidak Lulus</Alert.Heading>
                          <p>Kamu tidak lulus dalam SBMPTN 2020</p>
                          <hr />
                          <p className="mb-0">
                            Jangan putus asa dan tetap semangat!
                          </p>
                        </Alert>
                      )
                    ) : null}
                    Pilihan:
                    <ListGroup as="ul">
                      <ListGroup.Item as="li" active>
                        {doc.data().pilihan1}
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        {doc.data().pilihan2}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {doc.data().isGetted ? (
                    <Badge variant="success" className="mr-2">
                      Berhasil
                    </Badge>
                  ) : null}

                  {doc.data().isLoading ? (
                    <Spinner animation="border" role="status" className="mr-2">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : null}
                  <small className="text-muted">
                    {doc.data().status
                      ? doc.data().status
                      : "Menunggu Countdown"}
                  </small>
                  {doc.data().isError ? (
                    <Alert variant="danger">
                      Terjadi Error: {doc.data().error}
                    </Alert>
                  ) : null}
                </Card.Footer>
              </Card>
            ))}
        </CardColumns>

        <br />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nama Pengirim</Form.Label>
            <Form.Control type="text" placeholder="Pengirim" />
            <Form.Text className="text-muted">Jangan aneh-aneh ya :D</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Pesan</Form.Label>
            <Form.Control type="text" placeholder="Pesan" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Kirim
          </Button>
        </Form>
        <br />
        <h2>Tempat memberi semangat!</h2>
        <ChatFeed
          messages={messages} // Boolean: list of message objects
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontSize: 12,
            },
            chatbubble: {
              borderRadius: 30,
              padding: 20,
            },
          }}
        />
      </Container>
    </div>
  );
}

export default Konten;
