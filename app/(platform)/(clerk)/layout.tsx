const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex items-center justify-center">
      {children}
    </main>
  );
};

export default ClerkLayout;
