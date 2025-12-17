import { Box, Grid, Paper, Typography } from "@mui/material";

const DashboardHome = () => {
  return (
    <Grid container spacing={3}>
      {[
        { title: "Total Items", value: "128" },
        { title: "Masters", value: "24" },
        { title: "Reports", value: "12" },
        { title: "Users", value: "5" }
      ].map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              bgcolor: 'background.paper'
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "gray", mb: 1 }}
            >
              {item.title}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardHome;
