import { Center, Divider } from "@mantine/core";

const NotFoundPage = () => {
  return (
    <Center>
      <div style={{display: 'flex', gap: "1rem", fontSize: "2rem"}}>
        <div>404</div>
        <Divider orientation="vertical" />
        <div>Not Found</div>
      </div>
    </Center>
  );
};

export default NotFoundPage;
