function showSalary(users, age) {
  return users
    .reduce((result, user) => {
      if (user.age <= age) {
        result.push(`${user.name}, ${user.balance}`);
      }
      return result;
    }, [])
    .join("\n");
}
