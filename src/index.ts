import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import { connect } from 'mongoose';


// Constants
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

// Start server
server.listen(port, async () => {
    //@ts-ignore
    await connect(process.env.MONGO_URI);
    logger.info(serverStartMsg + port);
});
