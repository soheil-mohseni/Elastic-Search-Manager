import { Client } from '@elastic/elasticsearch';

export class GlobalService {

  static esClient: Client | null = null;

  // Method to configure and initialize the Elasticsearch client
  static async configureElasticsearch(username: string, password: string, host: string) {
    
    // Initialize the Elasticsearch client with the provided configuration
    this.esClient = await new Client({
      node: `https://${username}:${password}@${host}`,
      tls: {
        rejectUnauthorized: false, // This disables SSL certificate verification
      },
    });
    return await this.checkConnection()

    
  }


  static async checkConnection(): Promise<boolean> {
    if (!this.esClient) {
      console.log("Elasticsearch client is not configured.");
      return false;
    }
      // Ping the Elasticsearch cluster to check connectivity
      await this.esClient.ping();
      console.log("Elasticsearch cluster is connected.");
      return true;
  }
  // Method to get the Elasticsearch client (ensures it’s initialized)
  static getClient(): Client {
    if (!this.esClient) {
      throw new Error("Elasticsearch client is not configured. Call configureElasticsearch() first.");
    }
    return this.esClient;
  }

  /**
   * Adds one hour to the given ISO 8601 timestamp.
   * @param timestamp - A string representing the ISO 8601 timestamp.
   * @returns A new timestamp string with one hour added, formatted to include only three milliseconds digits.
   */
  static addOneHourToTimestamp(timestamp: string): string {
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid timestamp format');
    }

    // Add one hour (60 minutes * 60 seconds * 1000 milliseconds)
    date.setHours(date.getHours() + 1);

    // Convert the updated date back to an ISO string
    let isoString = date.toISOString();

    // Ensure only the first three digits of milliseconds are kept
    isoString = isoString.replace(/\.(\d{3})\d*Z$/, '.$1Z');

    return isoString;
  }
}
