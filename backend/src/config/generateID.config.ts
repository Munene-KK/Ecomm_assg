export const generateUserId = (fullname: string): string => {
  const name: string[] = fullname.split(" ");
  const firstName: string = name[0]?.toString() as string;
  const radomID: number = Math.floor(1000 + Math.random() * 9000);
  const userID: string = `${firstName}${radomID}`;
  return userID;
};
