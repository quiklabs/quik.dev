import styled from "styled-components";

const Layout = styled.div`
  background-image: url("/assets/bg.png");
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const Container = styled.div`
  height: 100vh;
  min-height: 800px;
  display: flex;
`;

const PosterSide = styled.div`
  flex: 1;
  height: 100%;
`;

const FormSide = styled.div`
  flex: 1;
  height: 100%;
`;

function PageLogin() {
  return (
    <Layout>
      <Container>
        <PosterSide>
          <h2>Hello</h2>
        </PosterSide>
        <FormSide>
          <h2>World</h2>
        </FormSide>
      </Container>
    </Layout>
  );
}

export default PageLogin;
